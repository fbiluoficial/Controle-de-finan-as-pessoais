-- Criar tabela de teste
CREATE TABLE IF NOT EXISTS test (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Inserir alguns dados de teste
INSERT INTO test (nome) VALUES 
    ('Teste 1'),
    ('Teste 2'),
    ('Teste 3');
