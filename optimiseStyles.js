function optimiseStyles(input) {
  const { styles, elementClasses } = input;
  const stylesKeys = Object.keys(styles);
  if (stylesKeys.length === 0) {
    return {
      styles,
      elementClasses,
    };
  }

  const counts = {};
  let styleObjectName = "";

  // Initialize queue for BFS
  const queue = [];
  const traversed = new Set(); // keep track of objects that have already been traversed

  queue.push({ node: styles, styleObjectName: "" });

  // BFS algorithm to traverse styles object
  // Time complexity: O(n)
  // where n is the total number of properties in the styles object and any nested objects within it.
  // Each property is visited exactly once,
  // and the number of properties visited is proportional to the total number of properties in the object.
  // Space complexity: O(n)
  while (queue.length) {
    const { node, styleObjectName } = queue.shift();

    // check if object has already been traversed
    if (traversed.has(node)) {
      continue;
    }
    traversed.add(node);

    if (node !== null && typeof node === "object") {
      // add null and object check
      for (const prop in node) {
        const value = node[prop];
        // if (!value) {
        //   continue
        // }

        if (typeof value === "object" && value) {
          queue.push({ node: value, styleObjectName: prop });
        } else {
          const key = `${prop}:${value}`;
          if (!counts[key]) {
            counts[key] = [styleObjectName];
          } else {
            counts[key].push(styleObjectName);
          }
        }
      }
    }
  }

  const commonProps = {};
  const uniqueProps = {};
  Object.keys(counts).forEach((key) => {
    // if the property belongs to more than one class, then it is common
    if (counts[key].length > 1) {
      commonProps[key] = counts[key];
    } else if (counts[key].length === 1) {
      // it is unique
      // we also can build uniqStylesObj from here
      uniqueProps[key] = counts[key][0];
    }
  });

  const customElementClasses = {};
  const uniqStylesObj = Object.keys(uniqueProps).reduce((acc, current) => {
    const styleName = uniqueProps[current];
    let [key, value] = current.split(":");
    if (!acc[styleName]) {
      acc[styleName] = {
        [key]: value,
      };
    } else {
      acc[styleName][key] = value;
    }
    if (styleName) {
      customElementClasses[styleName] = new Set([styleName]);
    }
    return acc;
  }, {});

  let commonStylesObj = Object.keys(commonProps).reduce((acc, current) => {
    const styleName = commonProps[current];
    let [key, value] = current.split(":");
    let className = styleName.join("");
    // let className = `${styleName[0]}${key.charAt(0).toUpperCase() + key.slice(1)}Common`
    if (!acc[className]) {
      acc[className] = {
        [key]: value,
      };
    } else {
      acc[className][key] = value;
    }

    styleName
      .filter((style) => style !== "")
      .forEach((style) => {
        if (!customElementClasses[style]) {
          customElementClasses[style] = new Set([className]);
        } else {
          customElementClasses[style].add(className);
        }
      });
    return acc;
  }, {});

  let outputElementClasses = {};
  Object.keys(customElementClasses).forEach((key) => {
    outputElementClasses[key] = Array.from(customElementClasses[key]);
  });

  const _elementClasses = {};
  for (let [key, value] of Object.entries(elementClasses)) {
    if (!value || value.length === 0) {
      _elementClasses[key] = [];
    } else {
      value.forEach((element) => {
        if (!_elementClasses[key]) {
          if (!element) {
            _elementClasses[key] = [element];
          } else {
            _elementClasses[key] = outputElementClasses[element];
          }
        } else {
          // remove duplicate classes
          _elementClasses[key] = Array.from(
            new Set([..._elementClasses[key], ...outputElementClasses[element]])
          );
        }
      });
    }
  }

  return {
    // countProps: counts,
    // commonProps: commonProps,
    // uniqueProps: uniqueProps,
    // uniqStylesObj: uniqStylesObj,
    // commonStylesObj: commonStylesObj,
    styles: {
      ...uniqStylesObj,
      ...commonStylesObj,
    },
    // elementClasses: outputElementClasses,
    elementClasses: _elementClasses,
  };
}

const styles = {
  firstBox: {
    backgroundColor: "red",
    width: 200,
    height: 200,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    margin: 16,
  },
  secondBox: {
    backgroundColor: "green",
    width: 200,
    height: 200,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    margin: 16,
  },
  thirdBox: {
    backgroundColor: "blue",
    width: 150,
    height: 50,
    alignSelf: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    margin: 16,
  },
};

console.log(
  optimiseStyles({
    styles: {
      // firstBox: null,
      firstBox: {
        backgroundColor: "red",
        width: 200,
        height: 200,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        margin: 16,
      },
      secondBox: {
        backgroundColor: "green",
        width: 200,
        height: 200,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        margin: 16,
      },
      thirdBox: {
        backgroundColor: "blue",
        width: 150,
        height: 50,
        alignSelf: "center",
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        margin: 16,
      },
      // secondBox: null,
      // thirdBox: {
      //   backgroundColor: "blue",
      //   width: 150,
      //   height: 50,
      //   alignSelf: "center",
      //   borderRadius: 20,
      //   borderColor: "black",
      //   borderWidth: 2,
      //   margin: 16,
      // },
    },
    elementClasses: {
      firstBox1: ["firstBox"],
      secondBox2: ["secondBox"],
      thirdBox3: ["thirdBox"],
    },
  })
);
