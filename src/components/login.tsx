import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FcGoogle } from "react-icons/fc"
import { supabase } from "../lib/supabase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "./ui/use-toast"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://uvvyoznzfhybbknyowtp.supabase.co/auth/v1/callback'
        }
      })

      if (error) {
        console.error('Erro Google:', error)
        toast({
          variant: "destructive",
          title: "Erro ao fazer login com Google",
          description: error.message,
        })
      }
    } catch (error) {
      console.error('Erro:', error)
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha",
      })
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Erro login:', error)
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: error.message,
        })
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Erro:', error)
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha",
      })
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      })

      if (error) {
        console.error('Erro signup:', error)
        toast({
          variant: "destructive",
          title: "Erro ao criar conta",
          description: error.message,
        })
      } else {
        toast({
          title: "Conta criada com sucesso",
          description: "Verifique seu email para confirmar o cadastro",
        })
      }
    } catch (error) {
      console.error('Erro:', error)
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Ocorreu um erro inesperado",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
          <CardDescription className="text-center">
            Faça login ou crie sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full h-12 font-medium gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FcGoogle className="w-5 h-5" />
              {loading ? "Conectando..." : "Continuar com Google"}
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com email
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12"
              />
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full h-12 font-medium"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 font-medium"
                onClick={handleSignUp}
                disabled={loading}
              >
                Criar nova conta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
