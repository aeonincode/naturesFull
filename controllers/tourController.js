const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    // with * covert it to number
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}

// 2) ROUTE HANDLERS
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // useful when we sending an array,multiple object 
        results: tours.length,
        data: {
            tours
        }
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id *1;

    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

exports.createTour = (req,res) => {
    //console.log(req.body);
    exports.newId = tours[tours.length -1].id + 1;
    exports.newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data : {
                tour: newTour
            }
        })
    })

    //send response
    //res.send('Done')
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        // sendback data,updated tour
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteTour = (req, res) => {
    // 204 means no content
    res.status(204).json({
        status: 'success',
        // usually we dont send any data back, we send null to show that the resource that we deleted now no longer exists
        data: null
    });
};