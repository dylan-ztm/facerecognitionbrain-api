const Clarifai = require('clarifai');

//The Clarifai Model key set below is current as of 7-3-2020
//and can be found at on Clarifai's API documentation
//at https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
const FACE_DETECT_MODEL_KEY = 'a403429f2ddf4b49b307e318f00e528b';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: '65eed300601c447a963934e13b2f0dc5',
   });

const handleApiCall = (req, res) => {
    console.log(Clarifai.FACE_DETECT_MODEL);
    app.models
    .predict(FACE_DETECT_MODEL_KEY, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API!'));

} //end handleApiCall

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('UNABLE TO GET ENTRIES!'));
} //end of handleImage

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}

