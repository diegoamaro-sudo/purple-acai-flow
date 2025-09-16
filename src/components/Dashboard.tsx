import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  CreditCard,
  Instagram,
  Phone,
  Store,
  Truck
} from "lucide-react";

// Mock data - será substituído pelos dados reais do Supabase
const mockData = {
  vendas: {
    hoje: 450.00,
    semana: 2800.00,
    mes: 12500.00
  },
  despesas: {
    hoje: 180.00,
    semana: 1200.00,
    mes: 5200.00
  },
  lucro: {
    hoje: 270.00,
    semana: 1600.00,
    mes: 7300.00
  },
  canaisVenda: [
    { nome: "Instagram", vendas: 8, valor: 400.00, taxa: 0, icon: Instagram },
    { nome: "iFood", vendas: 12, valor: 600.00, taxa: 12, icon: Truck },
    { nome: "WhatsApp", vendas: 5, valor: 250.00, taxa: 0, icon: Phone },
    { nome: "Ponto Físico", vendas: 15, valor: 750.00, taxa: 0, icon: Store }
  ],
  despesasCategoria: [
    { categoria: "Ingredientes", valor: 1800.00, cor: "bg-primary" },
    { categoria: "Energia", valor: 450.00, cor: "bg-accent" },
    { categoria: "Combustível", valor: 320.00, cor: "bg-success" },
    { categoria: "Outros", valor: 230.00, cor: "bg-warning" }
  ]
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe suas vendas e performance em tempo real
          </p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <TrendingUp className="mr-2 h-4 w-4" />
          Relatório Completo
        </Button>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {mockData.vendas.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <CreditCard className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              R$ {mockData.despesas.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              -5.2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro do Mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              R$ {mockData.lucro.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +58.4% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas por período */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg">Hoje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Vendas</span>
              <span className="font-medium text-primary">
                R$ {mockData.vendas.hoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Despesas</span>
              <span className="font-medium text-accent">
                R$ {mockData.despesas.hoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Lucro</span>
              <span className="font-bold text-success">
                R$ {mockData.lucro.hoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg">Esta Semana</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Vendas</span>
              <span className="font-medium text-primary">
                R$ {mockData.vendas.semana.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Despesas</span>
              <span className="font-medium text-accent">
                R$ {mockData.despesas.semana.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Lucro</span>
              <span className="font-bold text-success">
                R$ {mockData.lucro.semana.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg">Este Mês</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Vendas</span>
              <span className="font-medium text-primary">
                R$ {mockData.vendas.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Despesas</span>
              <span className="font-medium text-accent">
                R$ {mockData.despesas.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Lucro</span>
              <span className="font-bold text-success">
                R$ {mockData.lucro.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendas por Canal e Despesas por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas por Canal */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Vendas por Canal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.canaisVenda.map((canal) => {
              const Icon = canal.icon;
              const valorLiquido = canal.valor * (1 - canal.taxa / 100);
              
              return (
                <div key={canal.nome} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{canal.nome}</p>
                      <p className="text-sm text-muted-foreground">{canal.vendas} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    {canal.taxa > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Taxa: {canal.taxa}%
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Despesas por Categoria */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              Despesas por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.despesasCategoria.map((despesa) => {
              const percentual = (despesa.valor / mockData.despesas.mes) * 100;
              
              return (
                <div key={despesa.categoria} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{despesa.categoria}</span>
                    <span className="font-bold">
                      R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${despesa.cor}`}
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {percentual.toFixed(1)}% do total de despesas
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}