const map = new Map();

export default {
    bind(el, binding) {
        const targetEl = binding.value();

        let moveimg = false;
        let x = 0;
        let y = 0;

        function mousedown(evt) {

            const [rect] = el.getClientRects();
            x = evt.x - rect.x;
            y = evt.y - rect.y; 

            moveimg = true;
        }

        function mousemove(evt) {
            if (!moveimg) return;

            el.style.left = evt.x - x + 'px';
            el.style.top = evt.y - y + 'px';
        }

        function mouseup() {
            moveimg = false;
        }

        targetEl.addEventListener('mousedown', mousedown);
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);


        map.set(targetEl, () => {
            targetEl.removeEventListener('mousedown', mousedown);
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        });
    },
    update(el, binding) {
        console.log('---update---');
    },
    unbind (el, binding) {
        const targetEl = binding.value();
        if (map.has(targetEl)) {
            map.get(targetEl)();
        }
    }
}