class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Definindo os dados dos animais
    const animais = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };

    try {
      // Validação e parsing dos parâmetros de entrada
      const brinquedos1 = this.validarEParsearBrinquedos(brinquedosPessoa1, brinquedosValidos);
      const brinquedos2 = this.validarEParsearBrinquedos(brinquedosPessoa2, brinquedosValidos);
      const listaAnimais = this.validarEParsearAnimais(ordemAnimais, animais);

      // Processamento da lógica de adoção
      const resultado = this.processarAdocoes(listaAnimais, animais, brinquedos1, brinquedos2);
      
      return { lista: resultado };
    } catch (error) {
      return { erro: error.message };
    }

  }

  validarEParsearBrinquedos(brinquedosString, brinquedosValidos) {
    const brinquedos = brinquedosString.split(',').map(b => b.trim());
    
    // Verifica se há brinquedos duplicados
    const brinquedosUnicos = new Set(brinquedos);
    if (brinquedos.length !== brinquedosUnicos.size) {
      throw new Error('Brinquedo inválido');
    }

    // Verifica se todos os brinquedos são válidos
    for (const brinquedo of brinquedos) {
      if (!brinquedosValidos.includes(brinquedo)) {
        throw new Error('Brinquedo inválido');
      }
    }

    return brinquedos;
  }

  validarEParsearAnimais(animaisString, animais) {
    const listaAnimais = animaisString.split(',').map(a => a.trim());
    
    // Verificar se há animais duplicados
    const animaisUnicos = new Set(listaAnimais);
    if (listaAnimais.length !== animaisUnicos.size) {
      throw new Error('Animal inválido');
    }

    // Verificar se todos os animais são válidos
    for (const animal of listaAnimais) {
      if (!animais[animal]) {
        throw new Error('Animal inválido');
      }
    }

    return listaAnimais;
  }

  processarAdocoes(listaAnimais, animais, brinquedos1, brinquedos2) {
    const resultado = [];
    const contadorPessoa1 = { count: 0 };
    const contadorPessoa2 = { count: 0 };
    const animaisAdotados = [];

    for (const nomeAnimal of listaAnimais) {
      const animal = animais[nomeAnimal];
      const destino = this.determinarDestino(nomeAnimal, animal, brinquedos1, brinquedos2, contadorPessoa1, contadorPessoa2, animaisAdotados);
      resultado.push(`${nomeAnimal} - ${destino}`);
    }

    // Ordeno em ordem alfabética
    resultado.sort();
    return resultado;
  }

  determinarDestino(nomeAnimal, animal, brinquedos1, brinquedos2, contadorPessoa1, contadorPessoa2, animaisAdotados){
    // Regra para Loco(jabuti)
    if (nomeAnimal === 'Loco'){
      return this.processarLoco(animal, brinquedos1, brinquedos2, contadorPessoa1, contadorPessoa2, animaisAdotados);
    }

    // ainda vou implementar o método pessoaPodeAdotar
    const pessoa1Pode = this.pessoaPodeAdotar();
    const pessoa2Pode = this.pessoaPodeAdotar();
  }

  processarLoco(animal, brinquedos1, brinquedos2, contadorPessoa1, contadorPessoa2, animaisAdotados){
    // Loco não se importa com ordem dos brinquedos mas precisa de companhia
    const temCompanhia = animaisAdotados.length > 0;

    if(!temCompanhia){
      return 'abrigo';
    }

    const pessoa1TemBrinquedos = this.temTodosBrinquedos(animal.brinquedos, brinquedos1);
    const pessoa2TemBrinquedos = this.temTodosBrinquedos(animal.brinquedos, brinquedos2);

    const pessoa1Pode = pessoa1TemBrinquedos && contadorPessoa1.count < 3;
    const pessoa2Pode = pessoa2TemBrinquedos && contadorPessoa2.count < 3;

    if (pessoa1Pode && pessoa2Pode){
      return 'abrigo';
    }

    if (pessoa1Pode) {
      contadorPessoa1.count++;
      return 'pessoa 1';
    }

    if (pessoa2Pode) {
      contadorPessoa2.count++;
      return 'pessoa 2';
    }

    return 'abrigo';
  }

  pessoaPodeAdotar(){}

  temTodosBrinquedos(brinquedodsAnimal, brinquedosPessoa) {
    return brinquedodsAnimal.every(brinquedo => brinquedosPessoa.includes(brinquedo));
  }
}

export { AbrigoAnimais as AbrigoAnimais };
