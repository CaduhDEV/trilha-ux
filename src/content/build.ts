import type {
  Course,
  Exercise,
  ExerciseInput,
  Flashcard,
  LessonItem,
  Module,
  ModuleDef,
  PathItem,
  PracticeItem,
  QuizItem,
  Step,
  Unit,
} from './types'

export const XP = {
  lesson: 10,
  lessonPerfectBonus: 5,
  lessonRepeat: 5,
  practice: 30,
  checkpoint: 20,
  exam: 50,
  examHonorsBonus: 20,
  project: 100,
  review: 10,
} as const

const withId = (input: ExerciseInput, id: string): Exercise => ({ ...input, id }) as Exercise

const quizzable = (e: Exercise) => e.type !== 'open'

export function buildCourse(defs: ModuleDef[]): Course {
  const modules: Module[] = []
  const units: Unit[] = []
  const items: PathItem[] = []
  const flashcards: Flashcard[] = []
  let order = 0
  let week = 0
  const allLessonExercises: Exercise[] = []

  defs.forEach((mdef, mi) => {
    const moduleId = `m${mi + 1}`
    const moduleItems: PathItem[] = []
    const moduleUnits: Unit[] = []
    const moduleExercises: Exercise[] = []

    mdef.units.forEach((udef, ui) => {
      week += 1
      const unitId = `${moduleId}-u${ui + 1}`
      const unitItems: PathItem[] = []
      const unitExercises: Exercise[] = []

      udef.lessons.forEach((ldef, li) => {
        const id = `${unitId}-l${li + 1}`
        let n = 0
        const steps: Step[] = ldef.steps.map((s) => {
          if (typeof s === 'string') return { kind: 'card', md: s.trim() }
          n += 1
          const exercise = withId(s, `${id}-e${n}`)
          if (quizzable(exercise)) unitExercises.push(exercise)
          return { kind: 'exercise', exercise }
        })
        const cards: Flashcard[] = (ldef.flashcards ?? []).map(([front, back], fi) => ({
          id: `${id}-f${fi + 1}`,
          front,
          back,
          lessonId: id,
        }))
        flashcards.push(...cards)
        const lesson: LessonItem = {
          id,
          kind: 'lesson',
          title: ldef.title,
          summary: ldef.summary,
          moduleId,
          unitId,
          order: 0,
          minutes: ldef.minutes ?? 15,
          xp: XP.lesson,
          steps,
          flashcards: cards,
          resources: ldef.resources ?? [],
        }
        unitItems.push(lesson)
      })

      udef.practices.forEach((pdef, pi) => {
        const practice: PracticeItem = {
          id: `${unitId}-p${pi + 1}`,
          kind: 'practice',
          title: pdef.title,
          summary: pdef.summary,
          moduleId,
          unitId,
          order: 0,
          minutes: pdef.minutes,
          xp: XP.practice,
          def: pdef,
        }
        unitItems.push(practice)
      })

      const extra = (udef.checkpointExtra ?? []).map((e, i) => withId(e, `${unitId}-cp-e${i + 1}`))
      const pool = [...unitExercises, ...extra]
      const checkpoint: QuizItem = {
        id: `${unitId}-cp`,
        kind: 'checkpoint',
        title: `Checkpoint da semana ${week}`,
        summary: `Teste rápido de absorção: ${udef.title}`,
        moduleId,
        unitId,
        order: 0,
        minutes: 10,
        xp: XP.checkpoint,
        pool,
        questionCount: Math.min(10, pool.length),
        passScore: 80,
        timeLimitMin: null,
      }
      unitItems.push(checkpoint)

      moduleExercises.push(...pool)
      const unit: Unit = {
        id: unitId,
        moduleId,
        number: week,
        title: udef.title,
        goal: udef.goal,
        items: unitItems,
        resources: udef.resources ?? [],
      }
      moduleUnits.push(unit)
      moduleItems.push(...unitItems)
    })

    allLessonExercises.push(...moduleExercises)
    const examExtra = (mdef.examExtra ?? []).map((e, i) => withId(e, `${moduleId}-exam-e${i + 1}`))
    const examPool = mdef.cumulativeExam
      ? [...allLessonExercises, ...examExtra]
      : [...moduleExercises, ...examExtra]
    const exam: QuizItem = {
      id: `${moduleId}-exam`,
      kind: 'exam',
      title: mdef.cumulativeExam ? 'Prova final do curso' : `Prova do módulo ${mi + 1}`,
      summary: mdef.cumulativeExam
        ? 'Prova cumulativa com questões de todos os módulos'
        : `Avaliação de tudo o que você viu em "${mdef.title}"`,
      moduleId,
      unitId: null,
      order: 0,
      minutes: mdef.cumulativeExam ? 60 : 35,
      xp: XP.exam,
      pool: examPool,
      questionCount: Math.min(mdef.cumulativeExam ? 40 : 25, examPool.length),
      passScore: 70,
      timeLimitMin: mdef.cumulativeExam ? 60 : 35,
    }
    const project: PracticeItem = {
      id: `${moduleId}-proj`,
      kind: 'project',
      title: mdef.project.title,
      summary: mdef.project.summary,
      moduleId,
      unitId: null,
      order: 0,
      minutes: mdef.project.minutes,
      xp: XP.project,
      def: mdef.project,
    }
    moduleItems.push(exam, project)

    const mod: Module = {
      id: moduleId,
      number: mi + 1,
      title: mdef.title,
      tagline: mdef.tagline,
      description: mdef.description,
      color: mdef.color,
      colorDark: mdef.colorDark,
      badge: mdef.badge,
      outcomes: mdef.outcomes,
      units: moduleUnits,
      exam,
      project,
      items: moduleItems,
    }
    modules.push(mod)
    units.push(...moduleUnits)
    items.push(...moduleItems)
  })

  for (const item of items) item.order = order++

  const exerciseById = new Map<string, { exercise: Exercise; itemId: string }>()
  for (const item of items) {
    if (item.kind === 'lesson') {
      for (const s of item.steps) if (s.kind === 'exercise') exerciseById.set(s.exercise.id, { exercise: s.exercise, itemId: item.id })
    } else if (item.kind === 'checkpoint' || item.kind === 'exam') {
      for (const e of item.pool) if (!exerciseById.has(e.id)) exerciseById.set(e.id, { exercise: e, itemId: item.id })
    }
  }

  return {
    modules,
    units,
    items,
    byId: new Map(items.map((i) => [i.id, i])),
    unitById: new Map(units.map((u) => [u.id, u])),
    moduleById: new Map(modules.map((m) => [m.id, m])),
    flashcards,
    flashcardById: new Map(flashcards.map((f) => [f.id, f])),
    exerciseById,
  }
}
