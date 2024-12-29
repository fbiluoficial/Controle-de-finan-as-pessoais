import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link to="/" className="font-medium">Início</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/dashboard" className="font-medium">Painel de Controle</Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Welcome Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo ao Sistema</CardTitle>
                <CardDescription>
                  Gerencie seus dados e recursos de forma eficiente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Utilize nossa plataforma para gerenciar suas informações de forma simples e eficaz.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard">
                  <Button>Acessar Painel</Button>
                </Link>
              </CardFooter>
            </Card>
          </section>

          {/* Features Grid */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recursos</CardTitle>
                <CardDescription>Explore as funcionalidades disponíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Gerenciamento de dados</li>
                  <li>Relatórios personalizados</li>
                  <li>Análise em tempo real</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Acompanhe seus números</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Visualização de dados</li>
                  <li>Métricas importantes</li>
                  <li>Gráficos interativos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suporte</CardTitle>
                <CardDescription>Ajuda quando precisar</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Documentação completa</li>
                  <li>Suporte técnico</li>
                  <li>Tutoriais em vídeo</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home
