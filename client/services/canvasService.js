schoolApp.service('canvasService', function() {
    
    var canvasSize = {
        regular: [80, 100],   
        small: [40, 50],
        adminAside: [48, 60],
        schoolAside: [33, 42]   
    };
    
    this.setCanvas = function (canvas, imgPath, size) {
            var context = canvas.getContext("2d");
            var imageObj = new Image();
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0, canvasSize[size][0], canvasSize[size][1]);
            };
            imageObj.src = imgPath + '.jpg'; 
    }

  
    // this.loadCanvasList = function (canvasList, imagePath, size) {
    //         for (let i = 0; i < canvasList.length; i++) {
    //             let canvas = canvasList[i];
    //             var dtForceReload = new Date();//way to force browser to reload picture after update of picture
    //             var imgPath = imagePath + $(canvas).data("canvas-id") + ".jpg?" + dtForceReload.getTime();
    //             this.setCanvas(canvas, imgPath, size);
    //         }
    // }
});

//common.loadCanvasList($("#courses canvas"), app.courseImagePath, "schoolAside");
