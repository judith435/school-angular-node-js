schoolApp.service('canvasService', function() {
    var self = this;
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

    this.loadCanvasList =  function (items, canvasID , imagePath, asideName) {
        items.forEach(function (item) {
            var drawingCanvas = document.getElementById(canvasID + item.id);
          //  console.log('id:  ' + item.id + '  drawingCanvas' + JSON.stringify(drawingCanvas));
            self.setCanvas(drawingCanvas, imagePath + item.id, asideName);
        });
    }
});

