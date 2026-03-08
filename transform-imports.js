export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.find(j.ImportDeclaration).forEach((path) => {
    const importPath = path.node.source.value;

    if (importPath.startsWith("../../components")) {
      path.node.source.value = importPath.replace(
        "../../components",
        "@components",
      );
    }

    if (importPath.startsWith("../../routes")) {
      path.node.source.value = importPath.replace("../../routes", "@routes");
    }
  });

  return root.toSource();
}
