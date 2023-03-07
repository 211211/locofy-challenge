Your task is to write a function optimiseStyles which will take this javascript object as parameter and do the following
1. Extract & create the common styles in styles object (extract only those styles which have more than 1 style property as common property)
2. update the objects in elementClasses
3. Return the object which will contain this updated styles and elementClasses

```
{
    styles: {
           firstBox: {
               backgroundColor: 'red',
               width: 200,
               height: 200,
               borderRadius: 20,
               borderColor: 'black',
               borderWidth: 2,
               margin: 16,
           },
           secondBox: {
               backgroundColor: 'green',
               width: 200,
               height: 200,
               borderRadius: 20,
               borderColor: 'black',
               borderWidth: 2,
               margin: 16,
           },
           thirdBox: {
               backgroundColor: 'blue',
               width: 150,
               height: 50,
               alignSelf: 'center',
               borderRadius: 20,
               borderColor: 'black',
               borderWidth: 2,
               margin: 16,
        }, 
    },
    elementClasses: {
        firstBox: ["firstBox"],
        secondBox: ["secondBox"],
        thirdBox: ["thirdBox"] 
    }
}
```

Expected output
```
{
    styles: {
        firstBoxBorderRadiusCommon: {
            borderRadius: 20,
            borderColor: 'black',
            borderWidth: 2,
            margin: 16,
        },
        firstBoxWidthCommon: {
            width: 200,
            height: 200,
        },
        firstBox: {
            backgroundColor: 'red',
        },
        secondBox: {
            backgroundColor: 'green',
        },
        thirdBox: {
            backgroundColor: 'blue',
            width: 150,
            height: 50,
            alignSelf: 'center',
        }
    },
    elementClasses: {
        firstBox: ["firstBoxBorderRadiusCommon", "firstBoxWidthCommon", "firstBox"],
        secondBox: ["firstBoxBorderRadiusCommon", "firstBoxWidthCommon", "secondBox"],
        thirdBox: ["firstBoxBorderRadiusCommon", "thirdBox"]
    } 
}
```
