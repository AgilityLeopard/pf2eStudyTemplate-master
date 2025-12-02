export function tokenizeDescription(text, items) {
  const sorted = [...items].sort((a, b) => b.name.length - a.name.length);

  let result = [{ type: "text", content: text }];

  for (const item of sorted) {
    const newResult = [];

    for (const block of result) {
      if (block.type !== "text") {
        newResult.push(block);
        continue;
      }

      const parts = block.content.split(new RegExp(`(${escape(item.name)})`, "gi"));

      for (const part of parts) {
        if (part.toLowerCase() === item.name.toLowerCase()) {
          newResult.push({ type: "item", item });
        } else if (part) {
          newResult.push({ type: "text", content: part });
        }
      }
    }

    result = newResult;
  }

  return result;
}

function escape(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
