CREATE TABLE dados_entrada(
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto VARCHAR(255) NOT NULL,
  peso VARCHAR(255) NOT NULL,
  qualidade VARCHAR(255) NOT NULL,
  data_entrada VARCHAR(255) NOT NULL,
  empresa VARCHAR(255) NOT NULL,
  cnpj VARCHAR(255) NOT NULL,
  placa VARCHAR(255) NOT NULL,
  motorista VARCHAR(255) NOT NULL
);
CREATE TABLE dados_saida(
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto VARCHAR(255) NOT NULL,
  peso VARCHAR(255) NOT NULL,
  qualidade VARCHAR(255) NOT NULL,
  data_saida VARCHAR(255) NOT NULL,
  empresa VARCHAR(255) NOT NULL,
  cnpj VARCHAR(255) NOT NULL,
  placa VARCHAR(255) NOT NULL,
  motorista VARCHAR(255) NOT NULL
);
-- criar a tabela e inserir alguns dados 
INSERT INTO dados_entrada(
    produto,
    peso,
    qualidade,
    data_entrada,
    empresa,
    cnpj,
    placa,
    motorista
  )
VALUES(
    'Arroz',
    '1kg',
    'Boa',
    '2022-06-22',
    'Empresa A',
    '12345678901234',
    'ABC-1234',
    'Motorista A'
  );
INSERT INTO dados_saida(
    produto,
    peso,
    qualidade,
    data_saida,
    empresa,
    cnpj,
    placa,
    motorista
  )
VALUES(
    'Feijão',
    '2kg',
    'Boa',
    '2022-06-22',
    'Empresa B',
    '12345678901234',
    'ABC-4567',
    'Motorista B'
  );