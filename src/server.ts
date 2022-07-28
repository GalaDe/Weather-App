import app from './app';
import { vars } from './utils/variables'


app.listen(vars.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${vars.PORT}`);
});
