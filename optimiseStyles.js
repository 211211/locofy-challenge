function optimiseStyles(input) {
  const { styles, elementClasses } = input;

  const counts = {};
  let styleObjectName = "";
  // we need to find out each property belongs to how many classes
  function traverse(node) {
    for (const prop in node) {
      const value = node[prop];
      if (typeof value === "object") {
        styleObjectName = prop;
        traverse(value);
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
  styleObjectName = "";

  traverse(styles);

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
    customElementClasses[styleName] = new Set([styleName]);
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

    styleName.forEach((style) => {
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
    value.forEach((element) => {
      if (!_elementClasses[key]) {
        _elementClasses[key] = outputElementClasses[element];
      } else {
        // remove duplicate classes
        _elementClasses[key] = Array.from(
          new Set([..._elementClasses[key], ...outputElementClasses[element]])
        );
      }
    });
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
    elementClasses: outputElementClasses,
    // _elementClasses: _elementClasses,
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
    },
    elementClasses: {
      firstBox: ["firstBox", "secondBox"],
      secondBox: ["secondBox"],
      thirdBox: ["thirdBox"],
    },
  })
);
