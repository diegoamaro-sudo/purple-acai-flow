import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import Fornecedores from "@/components/Fornecedores";
import Produtos from "@/components/Produtos";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'vendas':
        return <div className="p-8 text-center text-muted-foreground">Aba Vendas - Em desenvolvimento</div>;
      case 'despesas':
        return <div className="p-8 text-center text-muted-foreground">Aba Despesas - Em desenvolvimento</div>;
      case 'produtos':
        return <Produtos />;
      case 'fornecedores':
        return <Fornecedores />;
      case 'fechar-caixa':
        return <div className="p-8 text-center text-muted-foreground">Aba Fechar Caixa - Em desenvolvimento</div>;
      case 'configuracoes':
        return <div className="p-8 text-center text-muted-foreground">Aba Configurações - Em desenvolvimento</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
