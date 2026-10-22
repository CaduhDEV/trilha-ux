import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { AppShell } from './components/AppShell'
import { Mascot } from './components/Mascot'
import { Toasts } from './components/Toasts'
import { Spinner } from './components/ui'
import { AppProvider, useApp } from './context/AppContext'
import Learn from './pages/Learn'
import Login from './pages/Login'

const Onboarding = lazy(() => import('./pages/Onboarding'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const Review = lazy(() => import('./pages/Review'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const Training = lazy(() => import('./pages/Training'))
const Plan = lazy(() => import('./pages/Plan'))
const Glossary = lazy(() => import('./pages/Glossary'))
const Profile = lazy(() => import('./pages/Profile'))
const Mentor = lazy(() => import('./pages/Mentor'))
const UnitGuide = lazy(() => import('./pages/UnitGuide'))
const Certificate = lazy(() => import('./pages/Certificate'))

function Splash() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex flex-col items-center gap-3">
        <Mascot size={96} className="animate-bob" />
        <span className="font-black text-brand-ink">trilha ux</span>
      </div>
    </div>
  )
}

/** Exige login e dados carregados; manda para o onboarding se ainda não fez. */
function Protected({ children }: { children: ReactNode }) {
  const { authReady, user, data, loadError, reload } = useApp()
  const location = useLocation()
  if (!authReady) return <Splash />
  if (!user) return <Navigate to="/entrar" replace />
  if (loadError)
    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div>
          <Mascot mood="sad" size={96} className="mx-auto" />
          <h1 className="mt-4 text-2xl font-black">Não consegui carregar seus dados</h1>
          <p className="mt-2 max-w-md font-semibold text-muted">{loadError}</p>
          <button className="btn btn-primary mt-6" onClick={reload}>
            Tentar de novo
          </button>
        </div>
      </div>
    )
  if (!data) return <Splash />
  if (!data.profile.onboarded && location.pathname !== '/boas-vindas') return <Navigate to="/boas-vindas" replace />
  return <Suspense fallback={<Spinner />}>{children}</Suspense>
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toasts />
        <Routes>
          <Route path="/entrar" element={<Login />} />
          <Route path="/boas-vindas" element={<Protected><Onboarding /></Protected>} />
          <Route path="/licao/:id" element={<Protected><LessonPage /></Protected>} />
          <Route path="/teste/:id" element={<Protected><QuizPage /></Protected>} />
          <Route path="/revisar/cartoes" element={<Protected><Flashcards /></Protected>} />
          <Route path="/revisar/treino" element={<Protected><Training /></Protected>} />
          <Route element={<Protected><AppShell /></Protected>}>
            <Route index element={<Learn />} />
            <Route path="/pratica/:id" element={<Suspense fallback={<Spinner />}><PracticePage /></Suspense>} />
            <Route path="/revisar" element={<Suspense fallback={<Spinner />}><Review /></Suspense>} />
            <Route path="/plano" element={<Suspense fallback={<Spinner />}><Plan /></Suspense>} />
            <Route path="/glossario" element={<Suspense fallback={<Spinner />}><Glossary /></Suspense>} />
            <Route path="/perfil" element={<Suspense fallback={<Spinner />}><Profile /></Suspense>} />
            <Route path="/mentor" element={<Suspense fallback={<Spinner />}><Mentor /></Suspense>} />
            <Route path="/guia/:unitId" element={<Suspense fallback={<Spinner />}><UnitGuide /></Suspense>} />
            <Route path="/certificado/:moduleId" element={<Suspense fallback={<Spinner />}><Certificate /></Suspense>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
