import { StrictMode } from "react"
import { createFebt } from "react-dom/client"

import "./index.css"
import App from "./App"
import "../../node_modules/@vscode/codicons/dist/codicon.css"

createFebt(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
