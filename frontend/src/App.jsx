import GlobalStyles from "./GlobalStyles";
import TablePage from "./pages/TablePage";
import TableStore from "./context/TablePageContext/TableStore";
import ChartStore from "./context/ChartContext/ChartStore";

// Global styles
// The Context for Sharing reactive state beteween components
// The actual Table page
// ! Quick Tip: In case you didn't know if you're using VS Code you can just "ctrl + click" on any component to navigate to it's source code
function App() {
  return (
    <div>
      <GlobalStyles />
      <TableStore>
       <ChartStore>
        <TablePage />
       </ChartStore>
      </TableStore>
    </div>
  );
}

export default App;
