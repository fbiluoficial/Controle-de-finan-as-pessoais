import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Plus, Filter, Moon, Sun, Pencil, Trash2 } from "lucide-react"
import { Table } from "./ui/table"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { supabase } from "../lib/supabase"

function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState("")

  // Carregar transações do Supabase ao iniciar
  useEffect(() => {
    loadTransactions()
    testarConexao()
  }, [])

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Erro ao carregar transações:", error)
        return
      }

      if (data) {
        setTransactions(data)
      }
    } catch (err) {
      console.error("Erro ao carregar transações:", err)
    }
  }

  const testarConexao = async () => {
    try {
      const { data, error } = await supabase
        .from('test')
        .select('*')
      
      if (error) {
        setConnectionStatus("Erro na conexão: " + error.message)
        console.error("Erro na conexão:", error)
      } else {
        setConnectionStatus("Conexão estabelecida com sucesso!")
        console.log("Dados recebidos:", data)
      }
    } catch (err) {
      setConnectionStatus("Erro ao tentar conectar: " + err.message)
      console.error("Erro:", err)
    }
  }

  const handleAddTransaction = async (formData) => {
    const newTransaction = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      created_at: new Date().toISOString()
    }

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([newTransaction])
        .select()

      if (error) {
        console.error("Erro ao adicionar transação:", error)
        return
      }

      if (data) {
        setTransactions([...transactions, data[0]])
      }
    } catch (err) {
      console.error("Erro ao adicionar transação:", err)
    }

    setIsNewTransactionOpen(false)
  }

  const handleDeleteTransaction = async (index) => {
    const transaction = transactions[index]
    
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transaction.id)

      if (error) {
        console.error("Erro ao deletar transação:", error)
        return
      }

      const updatedTransactions = transactions.filter((_, i) => i !== index)
      setTransactions(updatedTransactions)
    } catch (err) {
      console.error("Erro ao deletar transação:", err)
    }
  }

  const handleEditTransaction = async (formData) => {
    if (editingIndex === null || !editingTransaction) return

    const updatedTransaction = {
      ...editingTransaction,
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category
    }

    try {
      const { error } = await supabase
        .from('transactions')
        .update(updatedTransaction)
        .eq('id', updatedTransaction.id)

      if (error) {
        console.error("Erro ao atualizar transação:", error)
        return
      }

      const updatedTransactions = [...transactions]
      updatedTransactions[editingIndex] = updatedTransaction
      setTransactions(updatedTransactions)
      setEditingTransaction(null)
      setEditingIndex(null)
    } catch (err) {
      console.error("Erro ao atualizar transação:", err)
    }
  }

  const totals = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.income += transaction.amount;
    } else {
      acc.expense += transaction.amount;
    }
    return acc;
  }, { income: 0, expense: 0 })

  const balance = totals.income - totals.expense

  const handleNewTransaction = () => {
    setEditingTransaction(null)
    setEditingIndex(null)
    setIsNewTransactionOpen(true)
  }

  const handleSubmitTransaction = async (event) => {
    event.preventDefault()
    
    const form = event.target
    const formData = {
      description: form.description.value,
      amount: form.amount.value,
      type: form.type.value,
      category: form.category.value
    }

    if (editingTransaction) {
      await handleEditTransaction(formData)
    } else {
      await handleAddTransaction(formData)
    }
  }

  const styles = {
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    iconButton: {
      width: '40px',
      height: '40px',
    },
    filterButton: {
      width: '100%',
      maxWidth: '200px',
    },
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 flex-col sm:flex-row sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Controle Financeiro</h2>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            size="icon"
            className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} hover:bg-accent`}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            ) : (
              <Sun className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            )}
            <span className="sr-only">Alternar tema</span>
          </Button>
          <Button 
            variant="outline"
            className="w-8 h-8 md:w-auto md:h-10 lg:h-12 flex items-center justify-center md:justify-start gap-2 px-2 md:px-4 rounded-full md:rounded-md transition-all duration-200 hover:bg-accent"
            onClick={() => console.log('Filtrar')}
          >
            <Filter className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            <span className="hidden md:inline">Filtrar</span>
          </Button>
          <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
            <DialogTrigger asChild>
              <Button 
                className="whitespace-nowrap px-4 py-2 sm:px-6"
                onClick={handleNewTransaction}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitTransaction}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      className="col-span-3"
                      placeholder="Digite a descrição"
                      defaultValue={editingTransaction?.description || ''}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Valor
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      placeholder="Digite o valor"
                      defaultValue={editingTransaction?.amount || ''}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Tipo
                    </Label>
                    <Select name="type" defaultValue={editingTransaction?.type || 'expense'}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Entrada</SelectItem>
                        <SelectItem value="expense">Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Categoria
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      className="col-span-3"
                      placeholder="Digite a categoria"
                      defaultValue={editingTransaction?.category || ''}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingTransaction ? 'Salvar alterações' : 'Adicionar'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-200">
              Total de Entradas
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <path d="M2 20h20" />
              <path d="M12 4v16" />
              <path d="m5 11 7-7 7 7" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totals.income.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-200">
              Total de Saídas
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <path d="M2 20h20" />
              <path d="M12 4v16" />
              <path d="m19 13-7 7-7-7" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totals.expense.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-200">
              Saldo Total
            </CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {balance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-lg font-bold mb-4">{connectionStatus}</div>
      
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle className="dark:text-white">Transações Recentes</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Suas últimas movimentações financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <thead>
                    <tr className="text-left">
                      <th className="w-[45%]">Descrição</th>
                      <th className="w-[25%]">Valor</th>
                      <th className="w-[20%]">Tipo</th>
                      <th className="w-[10%] text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-muted/50 dark:hover:bg-gray-800/50">
                        <td className="font-medium dark:text-gray-200">{transaction.description}</td>
                        <td className={`${
                          transaction.type === 'income' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          R$ {transaction.amount.toFixed(2)}
                        </td>
                        <td>
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            transaction.type === 'income'
                              ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/50 dark:text-green-400 dark:ring-green-400/20'
                              : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/50 dark:text-red-400 dark:ring-red-400/20'
                          }`}>
                            {transaction.type === 'income' ? 'Entrada' : 'Saída'}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              onClick={() => {
                                setEditingTransaction(transaction)
                                setEditingIndex(index)
                                setIsNewTransactionOpen(true)
                              }}
                              className="h-8 w-8 md:w-auto md:px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:hover:bg-blue-900/70 dark:text-blue-400"
                              variant="ghost"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="hidden md:inline ml-2">Editar</span>
                            </Button>
                            <Button
                              onClick={() => handleDeleteTransaction(index)}
                              className="h-8 w-8 md:w-auto md:px-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/50 dark:hover:bg-red-900/70 dark:text-red-400"
                              variant="ghost"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden md:inline ml-2">Excluir</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Saídas</CardTitle>
                <CardDescription>
                  Visualize e gerencie seus gastos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  {transactions
                    .filter(t => t.type === 'expense')
                    .map((transaction, index) => (
                      <div key={index} className="mb-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-red-100 text-red-700">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M2 20h20" />
                                <path d="M12 4v16" />
                                <path d="m19 13-7 7-7-7" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold">{transaction.description}</h4>
                              <p className="text-sm text-muted-foreground">Despesa</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date().toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-red-600">R$ {transaction.amount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Entradas</CardTitle>
                <CardDescription>
                  Visualize e gerencie suas receitas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full">
                  {transactions
                    .filter(t => t.type === 'income')
                    .map((transaction, index) => (
                      <div key={index} className="mb-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-green-100 text-green-700">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M2 20h20" />
                                <path d="M12 4v16" />
                                <path d="m5 11 7-7 7 7" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold">{transaction.description}</h4>
                              <p className="text-sm text-muted-foreground">Receita</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date().toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">R$ {transaction.amount.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Mensal</CardTitle>
                <CardDescription>
                  Visão geral das suas finanças no mês atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Total de Entradas</h4>
                    <p className="text-2xl font-bold text-green-600">R$ {totals.income.toFixed(2)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Total de Saídas</h4>
                    <p className="text-2xl font-bold text-red-600">R$ {totals.expense.toFixed(2)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Saldo do Mês</h4>
                    <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Dashboard
