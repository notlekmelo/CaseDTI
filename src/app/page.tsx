"use client";
import { useState } from "react";
import { Produto } from "./interfaces/produtos";
import { Navbar } from  "./components/navbar";
import styles from "./page.module.css";
import formatarValor from "./functions/formatarValor";
import "./globals.css"; 

export default function Home() {
  const [tipoDesconto, setTipoDesconto] = useState("P");
  const [valorDesconto, setValorDesconto] = useState(0);
  const [produtos, setProdutos] = useState<Produto[]>([
    { descricao: "Echo dot", quantidade: 1, valor: 250.0 },
    { descricao: "Memória RAM 8GB", quantidade: 2, valor: 326.9 },
    { descricao: "Lâmpada inteligente", quantidade: 5, valor: 58.0 },
  ]);

  let resultado = 0;

  function handleSubmit(data: FormData) {
    const valor = Number(data.get("ValorDesconto") || 0);
    setValorDesconto(valor);
  }

  function exibirProdutos() {
    let percentualDesconto = 0;
    if (tipoDesconto == "P") {
      percentualDesconto = valorDesconto / 100;
    } else {
      const soma = 0;
      const somaTotalSemDesconto = produtos
        .map((produto) => produto.valor * produto.quantidade)
        .reduce((somaProdutos, valorFinal) => somaProdutos + valorFinal, soma);
      percentualDesconto = valorDesconto > somaTotalSemDesconto ? 1 : valorDesconto / somaTotalSemDesconto;
    }
    resultado = 0;
    const response = produtos.map((produto, index) => {
      const produtoSemDesconto = produto.quantidade * produto.valor;
      let descontoProduto = produtoSemDesconto * percentualDesconto;
      let produtoComDesconto = produtoSemDesconto - descontoProduto;
      resultado += produtoComDesconto;
      return (
        <tr key={index}>
          <td>{produto.descricao}</td>
          <td>{produto.quantidade}</td>
          <td>{formatarValor(produto.valor)}</td>
          <td>{formatarValor(descontoProduto)}</td>
          <td>{formatarValor(produtoComDesconto)}</td>
        </tr>
      );
    });
    return response;
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>

        <form action={handleSubmit}>
          <div>
            <label>Desconto: </label> 
          </div>
          <div className={styles.row}>
            <input
              className={styles.input}
              type="number"
              name="ValorDesconto"
              min="0"
              max={tipoDesconto == "P" ? 100 : undefined}
              step=".01"
            />
            <div className={styles.radioButton}>
              <input
                type="radio"
                name="TipoDesconto"
                value="P"
                onChange={(e) => setTipoDesconto("P")}
                checked={tipoDesconto == "P"}
              />
              Percentual
            </div>
            <div className={styles.radioButton}>
              <input
                type="radio"
                name="TipoDesconto"
                value="V"
                onChange={(e) => setTipoDesconto("V")}
                checked={tipoDesconto == "V"}
              />
              Valor
            </div>
            <div>
          </div>
            <button className={styles.button} type="submit">
              Aplicar
            </button>
          </div>
        </form>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Desconto</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>{exibirProdutos()}</tbody>
          <tfoot className={styles.footer}>
            <tr>
              <td colSpan={5}>
                <p className={styles.footerLine}>Valor Total: {formatarValor(resultado)}</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </main>
    </>
  );
}
