import { Switch, Route } from 'react-router';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import HomePage from './components/Views/HomePage/HomePage';
import MoviesPage from './components/Views/MoviesPage/MoviesPage';
import MovieDetails from './components/Views/MovieDetails/MovieDetails';

function App() {
  return (
    <Container>
      <AppBar />

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/movies">
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
