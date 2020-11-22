const fs = require('fs');
const express = require('express');

const app = express();

// simple middleware
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({message:'Hello from the server side!', app: 'Naturs'})
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...');
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        // useful when we sending an array,multiple object 
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id *1;

    const tour = tours.find(el => el.id === id)

    // first solution
    //if(id > tours.length) {

    // second solution
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    // first solution
    // const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const createTour = (req,res) => {
    //console.log(req.body);
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

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

const updateTour = (req, res) => {
    // with * covert it to number
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        // sendback data,updated tour
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
    // with * covert it to number
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    // 204 means no content
    res.status(204).json({
        status: 'success',
        // usually we dont send any data back, we send null to show that the resource that we deleted now no longer exists
        data: null
    })
}

// use get to get all tours
//instead of passing callback function directly we use getAllTours
//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
// use post to create new tour, send data from client to server
//app.post('/api/v1/tours', createTour);
// update data
//app.patch('/api/v1/tours/:id', updateTour)
//app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})