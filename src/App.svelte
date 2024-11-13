<script>
  import { Router, Link, Route } from "svelte-routing"
  import Home from "./routes/Home.svelte"

  let url = $state("/")
</script>

<Router {url}>
  <Route path="/"><Home /></Route>
</Router>
