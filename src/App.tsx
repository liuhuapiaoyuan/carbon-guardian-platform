
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Organization from "./pages/Organization";
import Buildings from "./pages/Buildings";
import DataCollection from "./pages/DataCollection";
import Parameters from "./pages/Parameters";
import CarbonSink from "./pages/CarbonSink";
import AlertsAndTasks from "./pages/AlertsAndTasks";
import DataVisualization from "./pages/DataVisualization";
import { ThemeProvider } from "./hooks/use-theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/buildings" element={<Buildings />} />
            <Route path="/data-collection" element={<DataCollection />} />
            <Route path="/parameters" element={<Parameters />} />
            <Route path="/carbon-sink" element={<CarbonSink />} />
            <Route path="/alerts" element={<AlertsAndTasks />} />
            <Route path="/data-visualization" element={<DataVisualization />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
