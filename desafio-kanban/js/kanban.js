const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuarioLogado) {
  Swal.fire("Acesso negado", "Você precisa estar logado.", "error").then(() => {
    window.location.href = "paginas/login.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
      Swal.fire("Acesso negado", "Você precisa estar logado.", "error").then(() => {
          window.location.href = "login.html";
      });
      return;
  }

  // Mostrar foto de perfil no index
  const imgIndex = document.getElementById("foto-perfil-index");
  const fotoIndex = localStorage.getItem(`fotoPerfil_${usuarioLogado.email}`);
  if (imgIndex && fotoIndex) {
      imgIndex.src = fotoIndex;
  }

  const kanban = document.getElementById("kanban");
  let dados = JSON.parse(localStorage.getItem("kanban_" + usuarioLogado.email)) || {
    colunas: [
      { titulo: "BackLog", tarefas: [] },
      { titulo: "Em Execução", tarefas: [] },
      { titulo: "Concluído", tarefas: [] },
    ],
  };

  const salvarLocalStorage = () =>
    localStorage.setItem("kanban_" + usuarioLogado.email, JSON.stringify(dados));

  function renderizar() {
    kanban.innerHTML = "";
    dados.colunas.forEach((coluna, index) => {
      const tarefasHTML = coluna.tarefas.map((t, i) => `
        <div class="tarefa" draggable="true" ondragstart="arrastar(event, ${index}, ${i})">
          <strong contenteditable="true" onblur="editarTarefa(${index}, ${i}, 'titulo', this.innerText)">${t.titulo}</strong>
          <p contenteditable="true" onblur="editarTarefa(${index}, ${i}, 'descricao', this.innerText)">${t.descricao}</p>
          <button class="btn-excluir" onclick="removerTarefa(${index}, ${i})">×</button>
        </div>
      `).join("");

      const colunaHTML = `
        <div class="coluna shadow-sm border">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <strong contenteditable="true" onblur="editarTitulo(${index}, this.innerText)">${coluna.titulo}</strong>
            <div>
              <button class="btn btn-sm btn-primary me-1" onclick="moverColuna(${index}, -1)">←</button>
              <button class="btn btn-sm btn-primary me-1" onclick="moverColuna(${index}, 1)">→</button>
              <button class="btn btn-sm btn-danger" onclick="removerColuna(${index})">X</button>
            </div>
          </div>
          <div class="tarefas mb-2" ondrop="soltar(event, ${index})" ondragover="permitirDrop(event)">
            ${tarefasHTML}
          </div>
          <button class="btn btn-outline-success btn-sm w-100" onclick="novaTarefa(${index})">+ Tarefa</button>
        </div>
      `;

      kanban.insertAdjacentHTML("beforeend", colunaHTML);
    });

    salvarLocalStorage();
  }

  const editarTitulo = (index, novoTitulo) => {
    dados.colunas[index].titulo = novoTitulo.trim();
    salvarLocalStorage();
  };

  const editarTarefa = (colIndex, tarefaIndex, campo, valor) => {
    dados.colunas[colIndex].tarefas[tarefaIndex][campo] = valor.trim();
    salvarLocalStorage();
  };

  function SwalConfirm({ title, text, icon = "warning", confirmButtonText = "Sim", cancelButtonText = "Cancelar" }) {
    return Swal.fire({
      title, text, icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    });
  }

  function novaTarefa(colIndex) {
    Swal.fire({
      title: "Nova Tarefa",
      html: `
        <input id="titulo" class="swal2-input" placeholder="Título">
        <textarea id="descricao" class="swal2-textarea" placeholder="Descrição"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Adicionar",
      preConfirm: () => {
        const titulo = document.getElementById("titulo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        if (!titulo) Swal.showValidationMessage("O título é obrigatório");
        return { titulo, descricao };
      },
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed) {
        dados.colunas[colIndex].tarefas.push(value);
        renderizar();
      }
    });
  }

  function adicionarColuna() {
    Swal.fire({
      title: "Nova Coluna",
      input: "text",
      inputPlaceholder: "Nome da coluna",
      showCancelButton: true,
      confirmButtonText: "Criar",
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed && value.trim()) {
        dados.colunas.push({ titulo: value.trim(), tarefas: [] });
        renderizar();
      }
    });
  }

  function removerColuna(index) {
    SwalConfirm({
      title: "Tem certeza?",
      text: "Essa coluna será removida com todas as tarefas."
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dados.colunas.splice(index, 1);
        renderizar();
      }
    });
  }

  function removerTarefa(colIndex, tarefaIndex) {
    SwalConfirm({
      title: "Remover Tarefa",
      text: "Deseja realmente excluir esta tarefa?"
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dados.colunas[colIndex].tarefas.splice(tarefaIndex, 1);
        renderizar();
      }
    });
  }

  const moverColuna = (index, direcao) => {
    const novoIndex = index + direcao;
    if (novoIndex >= 0 && novoIndex < dados.colunas.length) {
      [dados.colunas[index], dados.colunas[novoIndex]] = [dados.colunas[novoIndex], dados.colunas[index]];
      renderizar();
    }
  };

  const permitirDrop = e => e.preventDefault();

  let tarefaArrastada = null;
  let origemColuna = null;

  const arrastar = (e, colIndex, tarefaIndex) => {
    tarefaArrastada = tarefaIndex;
    origemColuna = colIndex;
  };

  const soltar = (e, destinoColuna) => {
    if (tarefaArrastada !== null) {
      const tarefa = dados.colunas[origemColuna].tarefas.splice(tarefaArrastada, 1)[0];
      dados.colunas[destinoColuna].tarefas.push(tarefa);
      tarefaArrastada = origemColuna = null;
      renderizar();
    }
  };

  window.arrastar = arrastar;
  window.soltar = soltar;
  window.permitirDrop = permitirDrop;
  window.editarTitulo = editarTitulo;
  window.editarTarefa = editarTarefa;
  window.removerTarefa = removerTarefa;
  window.removerColuna = removerColuna;
  window.moverColuna = moverColuna;
  window.novaTarefa = novaTarefa;
  window.adicionarColuna = adicionarColuna;

  renderizar();
});