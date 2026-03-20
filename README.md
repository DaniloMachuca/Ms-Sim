# MFSIM Telemetry Simulator

**Candidato:** Danilo Machuca
**Vaga:** Estágio em MS-Sim

---

## 📌 Visão Geral

Este projeto consiste em um sistema de simulação de telemetria em tempo real, composto por duas aplicações desktop:

* **Telemetry Control** (Aplicativo de controle via sliders)
* **Flight Instruments** (Painel de instrumentos)

Ambas as aplicações se comunicam por meio de um arquivo JSON local, permanecendo sincronizadas em tempo real.

---

## ⚙️ Tecnologias Utilizadas

* Electron
* React + TypeScript
* TailwindCSS
* Node.js (módulo `fs`)

---

## 🧠 Arquitetura

```
Telemetry Control → escreve dados → arquivo JSON
                                         ↓
                              Flight Instruments lê
                                         ↓
                              Atualização em tempo real
```

Além disso, ambas as aplicações monitoram alterações no arquivo, garantindo sincronização bidirecional.

---

## 🔄 Funcionalidades

* Sincronização em tempo real entre aplicações
* Comunicação baseada em arquivo (sem uso de banco de dados)
* Calibração não linear dos instrumentos (comportamento realista)
* Interface responsiva e intuitiva
* Aplicações desktop utilizando Electron

---

## 📊 Lógica dos Instrumentos

Os instrumentos utilizam mapeamento não linear calibrado manualmente para representar com maior fidelidade o comportamento real de gauges, ao invés de uma interpolação linear simples.

---

## 📁 Armazenamento de Dados

Os dados são armazenados em:

```
C:\MFSIM DADOS\dados.json
```

O arquivo é criado automaticamente caso não exista.

---

## ▶️ Como Executar

### Ambiente de Desenvolvimento

```
npm install
npm run dev
npm run electron
```

---

### Gerar Executável (.exe)

```
npm run dist
```

---

## 🧪 Como Utilizar

1. Abra o **Telemetry Control**
2. Abra o **Flight Instruments**
3. Ajuste os valores no aplicativo de controle
4. Observe os instrumentos atualizando em tempo real

---

## 🎯 Observações

* O sistema foi projetado para ser simples, previsível e fácil de testar
* Não utiliza dependências externas como banco de dados ou APIs
* Foco em sincronização de estado e clareza visual

---

## 📌 Autor

Danilo Machuca
