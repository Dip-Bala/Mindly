import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}){
    return(
        <div className="flex">
            <Sidebar />
            <div className="h-screen overflow-hidden">
                <Header />
                {children}
            </div>
        </div>
    )
}