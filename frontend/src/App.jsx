import GlobalStyles from "./GlobalStyles";
import TablePage from "./pages/TablePage";
import TableStore from "./context/TablePageContext/TableStore";

// Global styles
// The Context for Sharing reactive state beteween components
// The actual Table page
// ! Quick Tip: In case you didn't know if you're using VS Code you can just "ctrl + click" on any component to navigate to it's source code
function App() {
  return (
    <div>
      <GlobalStyles />
      <TableStore>
        <TablePage />
      </TableStore>
    </div>
  );
}

export default App;
