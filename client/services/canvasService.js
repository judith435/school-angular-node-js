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
            context.clearRect(0, 0, canvas.width, canvas.height);
            var imageObj = new Image();
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0, canvasSize[size][0], canvasSize[size][1]);
            };
            imageObj.src = imgPath + '.jpg';
    }

    this.loadCanvasList =  function (items, canvasID , imagePath, size) {
        items.forEach(function (item) {
            var drawingCanvas = document.getElementById(canvasID + item.id);
            self.setCanvas(drawingCanvas, imagePath + item.id, size);
        });
    }

    this.loadCanvasListX =  function (items, objName ,canvasID , imagePath, size) {
        for (let i = 0; i < items[objName].length; i++) {
            var drawingCanvas = document.getElementById(canvasID + items[objName][i].id);
            if (drawingCanvas) {            
               self.setCanvas(drawingCanvas, imagePath + items[i].id, size);
            }
        }
    }



});

