const interactionHandlers = (() => {
    let selectedNode = null;

    const init = () => {
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            node.addEventListener('mousedown', onNodeMouseDown);
            node.addEventListener('click', onNodeClick);
        });
    };

    const onNodeMouseDown = (event) => {
        selectedNode = event.target;
        const offsetX = event.clientX - selectedNode.getBoundingClientRect().left;
        const offsetY = event.clientY - selectedNode.getBoundingClientRect().top;

        const onMouseMove = (moveEvent) => {
            selectedNode.style.left = `${moveEvent.clientX - offsetX}px`;
            selectedNode.style.top = `${moveEvent.clientY - offsetY}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            selectedNode = null;
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onNodeClick = (event) => {
        const nodeId = event.target.dataset.nodeId;
        if (nodeId) {
            window.location.href = `/wiki/${nodeId}`;
        }
    };

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', interactionHandlers.init);