import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
  
  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,INVALID', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedos duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA,LASER', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animais duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'LASER,RATO', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve processar Loco com companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,SKATE', 'BOLA,LASER', 'Rex,Loco');
    // Rex vai para pessoa 1 (tem RATO,BOLA na ordem)
    // Loco tem companhia e pessoa 1 tem SKATE,RATO (não importa ordem para Loco)
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve deixar Loco no abrigo sem companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'BOLA,LASER', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve respeitar limite de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO', 
      'BOLA,LASER', 
      'Rex,Bola,Zero,Mimi'
    );
    // Rex: RATO,BOLA - pessoa 1 tem na ordem
    // Bola: CAIXA,NOVELO - pessoa 1 tem na ordem  
    // Zero: RATO,BOLA - pessoa 1 tem na ordem
    // Mimi: BOLA,LASER - pessoa 2 tem na ordem
    // Pessoa 1 já tem 3 animais, então não pode adotar mais
    expect(resultado.lista[0]).toBe('Bola - pessoa 1');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 2');
    expect(resultado.lista[2]).toBe('Rex - pessoa 1');
    expect(resultado.lista[3]).toBe('Zero - pessoa 1');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve deixar animal no abrigo quando ambas pessoas podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve processar múltiplos gatos corretamente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 
      'BOLA,RATO,LASER', 
      'Mimi,Fofo,Zero'
    );
    // Mimi: precisa BOLA,LASER - ambas pessoas podem, vai para abrigo
    // Fofo: precisa BOLA,RATO,LASER - pessoa 2 tem na ordem correta
    // Zero: precisa RATO,BOLA - pessoa 2 tem BOLA,RATO,LASER (RATO não vem antes de BOLA)
    expect(resultado.lista[0]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[1]).toBe('Mimi - abrigo');
    expect(resultado.lista[2]).toBe('Zero - abrigo');
    expect(resultado.lista.length).toBe(3);
    expect(resultado.erro).toBeFalsy();
    });
});
