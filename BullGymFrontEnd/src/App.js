import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header.js";
import { HomePage } from "./pages/HomePage.js";
import { RegisterPage } from "./pages/RegisterPage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { ExercisePage } from "./pages/ExercisePage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";
import { Footer } from "./components/Footer.js";
import { NewExercise } from "./components/NewExercise";
import { UserPage } from "./pages/UserPage";
import { ModifyExercise } from "./components/ModifyExercise";
import { useExercises } from "./hooks/useExercises";

function App() {
  const {
    loading,
    error,
    filter,
    handleFilter,
    selectExercise,
    selected,
    removeExercise,
    exercises,
    likeExercise,
    favExercise,
    addExercise,
    setExercises,
    setSelected,
  } = useExercises();
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              loading={loading}
              handleFilter={handleFilter}
              error={error}
              selectExercise={selectExercise}
              selected={selected}
              removeExercise={removeExercise}
              likeExercise={likeExercise}
              filter={filter}
              exercises={exercises}
              favExercise={favExercise}
              addExercise={addExercise}
            />
          }
        />
        <Route path="/users" element={<RegisterPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/:id" element={<UserPage exercises={exercises} />} />
        <Route
          path="/exercises"
          element={<NewExercise addExercise={addExercise} />}
        />
        <Route
          path="/exercises/:idExercise/edit"
          element={
            <ModifyExercise
              addExercise={addExercise}
              setExercises={setExercises}
              setSelected={setSelected}
            />
          }
        />
        <Route
          path="/exercises/:idExercise"
          element={
            <ExercisePage
              selected={selected}
              favExercise={favExercise}
              likeExercise={likeExercise}
              removeExercise={removeExercise}
              addExercise={addExercise}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
