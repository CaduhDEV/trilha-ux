// ---------------------------------------------------------------------
// Tipos do conteúdo do curso.
// Os arquivos de cada semana (src/content/mX/uY.ts) usam os "Def"
// (forma de autoria) e o build.ts transforma tudo no curso navegável,
// com ids estáveis: m1, m1-u2, m1-u2-l3, m1-u2-p1, m1-u2-cp, m1-exam, m1-proj.
// ---------------------------------------------------------------------

export type ExerciseInput =
  | { type: 'mc'; prompt: string; context?: string; correct: string; wrong: string[]; explanation: string }
  | { type: 'multi'; prompt: string; context?: string; correct: string[]; wrong: string[]; explanation: string }
  | { type: 'tf'; statement: string; context?: string; answer: boolean; explanation: string }
  | { type: 'fill'; sentence: string; correct: string; wrong: string[]; explanation: string }
  | { type: 'match'; prompt: string; pairs: [string, string][]; explanation?: string }
  | { type: 'order'; prompt: string; items: string[]; explanation: string }
  | { type: 'contrast'; fg: string; bg: string; large?: boolean; sample?: string }
  | { type: 'ab'; prompt: string; a: string; b: string; correct: 'a' | 'b'; explanation: string }
  | { type: 'open'; prompt: string; guidance: string }

export type Exercise = ExerciseInput & { id: string }

export type ResourceKind = 'artigo' | 'video' | 'ferramenta' | 'livro' | 'curso' | 'site'

export interface Resource {
  title: string
  url?: string
  kind: ResourceKind
  lang?: 'pt' | 'en'
  note?: string
}

/** Um passo da lição: um cartão de teoria (markdown) ou um exercício. */
export type StepInput = string | ExerciseInput

export interface LessonDef {
  title: string
  summary: string
  minutes?: number
  steps: StepInput[]
  /** [frente, verso] — viram cartões de revisão espaçada e entram no glossário */
  flashcards?: [string, string][]
  resources?: Resource[]
}

export type PracticeTool = 'figma' | 'figjam' | 'papel' | 'pesquisa' | 'escrita' | 'web'

export interface PracticeDef {
  title: string
  summary: string
  minutes: number
  tool: PracticeTool
  /** Contexto em markdown */
  brief: string
  steps: string[]
  deliverable: string
  /** Critérios de autoavaliação — cada um vira um checkbox */
  rubric: string[]
  resources?: Resource[]
  tips?: string[]
}

export interface UnitDef {
  title: string
  goal: string
  lessons: LessonDef[]
  practices: PracticeDef[]
  /** Perguntas extras que só aparecem no checkpoint da semana */
  checkpointExtra?: ExerciseInput[]
  resources?: Resource[]
}

export interface ModuleDef {
  title: string
  tagline: string
  description: string
  color: string
  colorDark: string
  /** Título que a pessoa conquista ao concluir o módulo */
  badge: string
  outcomes: string[]
  units: UnitDef[]
  project: PracticeDef
  examExtra?: ExerciseInput[]
  /** Prova final: sorteia de todos os módulos */
  cumulativeExam?: boolean
}

// ---------------------------------------------------------------------
// Forma "construída"
// ---------------------------------------------------------------------

export type Step = { kind: 'card'; md: string } | { kind: 'exercise'; exercise: Exercise }

export interface Flashcard {
  id: string
  front: string
  back: string
  lessonId: string
}

export type ItemKind = 'lesson' | 'practice' | 'checkpoint' | 'exam' | 'project'

interface BaseItem {
  id: string
  kind: ItemKind
  title: string
  summary: string
  moduleId: string
  unitId: string | null
  /** Posição na trilha (0…n) */
  order: number
  minutes: number
  xp: number
}

export interface LessonItem extends BaseItem {
  kind: 'lesson'
  steps: Step[]
  flashcards: Flashcard[]
  resources: Resource[]
}

export interface PracticeItem extends BaseItem {
  kind: 'practice' | 'project'
  def: PracticeDef
}

export interface QuizItem extends BaseItem {
  kind: 'checkpoint' | 'exam'
  pool: Exercise[]
  questionCount: number
  passScore: number
  timeLimitMin: number | null
}

export type PathItem = LessonItem | PracticeItem | QuizItem

export interface Unit {
  id: string
  moduleId: string
  number: number // semana 1…24
  title: string
  goal: string
  items: PathItem[]
  resources: Resource[]
}

export interface Module {
  id: string
  number: number
  title: string
  tagline: string
  description: string
  color: string
  colorDark: string
  badge: string
  outcomes: string[]
  units: Unit[]
  exam: QuizItem
  project: PracticeItem
  items: PathItem[]
}

export interface Course {
  modules: Module[]
  units: Unit[]
  items: PathItem[]
  byId: Map<string, PathItem>
  unitById: Map<string, Unit>
  moduleById: Map<string, Module>
  flashcards: Flashcard[]
  flashcardById: Map<string, Flashcard>
  exerciseById: Map<string, { exercise: Exercise; itemId: string }>
}
