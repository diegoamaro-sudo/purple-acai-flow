import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit2, Trash2, Upload, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustoItem {
  id: string;
  nome: string;
  valorTotal: number;
  quantidade: number;
  custoUnitario: number;
}

interface Produto {
  id: string;
  nome: string;
  foto?: string;
  custos: CustoItem[];
  custoTotalCalculado: number;
}

export default function Fornecedores() {
  const { toast } = useToast();
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: '1',
      nome: 'Açaí 500ml',
      custos: [
        {
          id: '1',
          nome: 'Açaí Base',
          valorTotal: 40,
          quantidade: 100,
          custoUnitario: 0.40
        },
        {
          id: '2', 
          nome: 'Copo 500ml',
          valorTotal: 15,
          quantidade: 50,
          custoUnitario: 0.30
        }
      ],
      custoTotalCalculado: 0.70
    }
  ]);

  const [novoProduto, setNovoProduto] = useState({ nome: '', foto: '' });
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [novoCusto, setNovoCusto] = useState({
    nome: '',
    valorTotal: 0,
    quantidade: 0
  });

  const adicionarProduto = () => {
    if (!novoProduto.nome) {
      toast({
        title: "Erro",
        description: "Nome do produto é obrigatório",
        variant: "destructive",
      });
      return;
    }

    const produto: Produto = {
      id: Date.now().toString(),
      nome: novoProduto.nome,
      foto: novoProduto.foto,
      custos: [],
      custoTotalCalculado: 0
    };

    setProdutos([...produtos, produto]);
    setNovoProduto({ nome: '', foto: '' });
    toast({
      title: "Produto adicionado",
      description: "Produto criado com sucesso!",
    });
  };

  const adicionarCusto = () => {
    if (!produtoSelecionado || !novoCusto.nome || !novoCusto.valorTotal || !novoCusto.quantidade) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const custoUnitario = novoCusto.valorTotal / novoCusto.quantidade;
    const custo: CustoItem = {
      id: Date.now().toString(),
      nome: novoCusto.nome,
      valorTotal: novoCusto.valorTotal,
      quantidade: novoCusto.quantidade,
      custoUnitario: custoUnitario
    };

    const produtoAtualizado = {
      ...produtoSelecionado,
      custos: [...produtoSelecionado.custos, custo],
      custoTotalCalculado: produtoSelecionado.custos.reduce((total, c) => total + c.custoUnitario, 0) + custoUnitario
    };

    setProdutos(produtos.map(p => p.id === produtoSelecionado.id ? produtoAtualizado : p));
    setProdutoSelecionado(produtoAtualizado);
    setNovoCusto({ nome: '', valorTotal: 0, quantidade: 0 });
    
    toast({
      title: "Custo adicionado",
      description: `Custo unitário: R$ ${custoUnitario.toFixed(2)}`,
    });
  };

  const removerCusto = (custoId: string) => {
    if (!produtoSelecionado) return;

    const custosAtualizados = produtoSelecionado.custos.filter(c => c.id !== custoId);
    const custoTotalCalculado = custosAtualizados.reduce((total, c) => total + c.custoUnitario, 0);

    const produtoAtualizado = {
      ...produtoSelecionado,
      custos: custosAtualizados,
      custoTotalCalculado
    };

    setProdutos(produtos.map(p => p.id === produtoSelecionado.id ? produtoAtualizado : p));
    setProdutoSelecionado(produtoAtualizado);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Fornecedores
          </h1>
          <p className="text-muted-foreground">
            Gerencie produtos e calcule custos unitários automaticamente
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Produto</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Produto</Label>
                <Input
                  id="nome"
                  value={novoProduto.nome}
                  onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
                  placeholder="Ex: Açaí 500ml"
                />
              </div>
              <div>
                <Label htmlFor="foto">Foto (URL)</Label>
                <Input
                  id="foto"
                  value={novoProduto.foto}
                  onChange={(e) => setNovoProduto({...novoProduto, foto: e.target.value})}
                  placeholder="URL da foto"
                />
              </div>
              <Button onClick={adicionarProduto} className="w-full">
                Criar Produto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Produtos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {produtos.map((produto) => (
          <Card key={produto.id} className="hover:shadow-glow transition-smooth cursor-pointer"
                onClick={() => setProdutoSelecionado(produto)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{produto.nome}</CardTitle>
                <Package className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              {produto.foto && (
                <div className="mb-3">
                  <img src={produto.foto} alt={produto.nome} 
                       className="w-full h-32 object-cover rounded-md" />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Itens de custo:</span>
                  <Badge variant="secondary">{produto.custos.length}</Badge>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Custo Total:</span>
                  <span className="text-primary">
                    R$ {produto.custoTotalCalculado.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Detalhes do Produto */}
      {produtoSelecionado && (
        <Dialog open={!!produtoSelecionado} onOpenChange={() => setProdutoSelecionado(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {produtoSelecionado.nome}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Resumo do Produto */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumo dos Custos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total de Itens</p>
                      <p className="text-2xl font-bold text-primary">
                        {produtoSelecionado.custos.length}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Custo Total Unitário</p>
                      <p className="text-2xl font-bold text-primary">
                        R$ {produtoSelecionado.custoTotalCalculado.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adicionar Novo Custo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adicionar Custo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="nome-custo">Nome do Item</Label>
                      <Input
                        id="nome-custo"
                        value={novoCusto.nome}
                        onChange={(e) => setNovoCusto({...novoCusto, nome: e.target.value})}
                        placeholder="Ex: Açaí base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="valor-total">Valor Total (R$)</Label>
                      <Input
                        id="valor-total"
                        type="number"
                        step="0.01"
                        value={novoCusto.valorTotal}
                        onChange={(e) => setNovoCusto({...novoCusto, valorTotal: Number(e.target.value)})}
                        placeholder="40.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quantidade">Quantidade</Label>
                      <Input
                        id="quantidade"
                        type="number"
                        value={novoCusto.quantidade}
                        onChange={(e) => setNovoCusto({...novoCusto, quantidade: Number(e.target.value)})}
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    {novoCusto.valorTotal > 0 && novoCusto.quantidade > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Custo unitário: <span className="font-medium text-primary">
                          R$ {(novoCusto.valorTotal / novoCusto.quantidade).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <Button onClick={adicionarCusto}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Custos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Itens de Custo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {produtoSelecionado.custos.map((custo) => (
                      <div key={custo.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{custo.nome}</h4>
                          <p className="text-sm text-muted-foreground">
                            R$ {custo.valorTotal.toFixed(2)} ÷ {custo.quantidade} = 
                            <span className="font-medium text-primary ml-1">
                              R$ {custo.custoUnitario.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerCusto(custo.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {produtoSelecionado.custos.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhum item de custo adicionado</p>
                        <p className="text-sm">Adicione itens para calcular o custo total</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Aviso sobre Supabase */}
      <Card className="border-warning/20 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Package className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-medium text-warning mb-1">
                Conecte o Supabase para funcionalidade completa
              </h3>
              <p className="text-sm text-muted-foreground">
                Para salvar produtos, calcular custos automaticamente nas vendas e sincronizar dados, 
                conecte seu projeto ao Supabase usando o botão verde no canto superior direito.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}