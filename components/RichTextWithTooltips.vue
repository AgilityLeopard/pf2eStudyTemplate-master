<script>
export default {
  name: "RichTextWithTooltips",
  props: {
    html: String,
    terms: Array
  },

  methods: {
    findTerm(text) {
      return this.terms.find(t =>
        text.toLowerCase().includes(t.term.toLowerCase())
      );
    },



    processNode(node, h) {
      // ТЕКСТ


      if (node.nodeType === 3) {
        const text = node.nodeValue;

        let parts = [text];

        this.terms.forEach(term => {
          const newParts = [];
          const regex = new RegExp(`(${term.term})`, "gi");

          parts.forEach(p => {
            if (typeof p === "string") {
              const split = p.split(regex);
              split.forEach(s => newParts.push(s));
            } else {
              newParts.push(p);
            }
          });

          parts = newParts.map(p => {
            if (
              typeof p === "string" &&
              p.toLowerCase() === term.term.toLowerCase()
            ) {
              return {
                type: "term",
                value: p,
                tooltip: term.tooltip
              };
            }
            return p;
          });
        });

        return parts.map(p => {
          if (typeof p === "string") return p;

          // 👉 ВСТАВЛЯЕМ V-TOOLTIP
          return h("v-tooltip", { props: { bottom: true } }, [
            h(
              "template",
              {
                slot: "activator",
                scopedSlots: {
                  default: ({ on, attrs }) =>
                    h(
                      "span",
                      {
                        class: "highlight-term",
                        on,
                        attrs
                      },
                      p.value
                    )
                }
              }
            ),
            h("span", p.tooltip)
          ]);
        });
      }

      // HTML ТЕГ
      if (node.nodeType === 1) {
        return h(
          node.tagName.toLowerCase(),
          {},
          Array.from(node.childNodes).map(child =>
            this.processNode(child, h)
          )
        );
      }

      return null;
    }
  },

  render(h) {
    if (!this.html) return null;


    const parser = new DOMParser();
    const doc = parser.parseFromString(this.html, "text/html");

    return h(
      "div",
      {},
      Array.from(doc.body.childNodes).map(node =>
        this.processNode(node, h)
      )
    );
  }
};
</script>