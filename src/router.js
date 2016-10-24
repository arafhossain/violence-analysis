import { merge, prop } from 'ramda';
import Search from './components/Pages/Search/index.jsx';
import NotFound from './components/Pages/NotFound';

export default function Router(sources) {
  const { router } = sources;

  const match$ = router.define({
    '/': Search,
    '*': NotFound
  });

  const page$ = match$.map(({ path, value }) => value(merge(sources, {
    path: router.path(path)
  })));

  const vdom$ = page$.map(prop('DOM')).flatten();

  const sinks = merge(sources, { DOM: vdom$ });

  return sinks;
}
