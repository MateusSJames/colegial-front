const buttonParam = document.getElementById('parametros')
const buttonPedido = document.getElementById('pedidos')

buttonParam?.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Hello Parametros');
    const filterContent = document.getElementById('filters');
    if(filterContent != null) {
        filterContent.innerHTML = `
            <h2>Status</h2>
        `;
    }
})

buttonPedido?.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Hello Parametros');
    const filterContent = document.getElementById('filters');
    if(filterContent != null) {
        filterContent.innerHTML = `
            <h2>Solicitado</h2>
            <h2>Separado</h2>
            <h2>Enviado</h2>
            <h2>Entregue</h2>
        `;
    }
})
