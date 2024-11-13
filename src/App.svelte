<script lang="ts">
  import { Router, Link, Route } from "svelte-routing"
  import Home from "./routes/Home.svelte"
  import Ssg from "./routes/Ssg.svelte"

  interface Props {
    url?: string
  }

  let { url = "" }: Props = $props()
</script>

<Router {url}>
  <Route path="/"><Home /></Route>
  <Route path="/ssg"><Ssg /></Route>
</Router>
