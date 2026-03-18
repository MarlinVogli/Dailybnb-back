const Property = require('../models/PropertyModels');
const Media = require('../uploads/media');

const propertyController = {
    createProperty: (req, res) => {
        const { host_id, propertyName, city, price } = req.body;

        const imagePath = req.file ? req.file.filename : null;

        Property.create({ host_id, propertyName, city, price }, (err, result) => {
            if (err) {
                console.error("Property create error:", err);
                return res.status(500).json({ error: err.message });
            }

            const propertyId = result.insertId;

            if (!imagePath) {
                return res.status(201).json({
                    msg: 'Property created (no image)',
                    propertyId
                });
            }

            Media.register(imagePath, propertyId, (err, mediaResult) => { 
                if (err) return res.status(500).json({ error: err.message });

                const mediaId = mediaResult.insertId;

                Property.updateMedia(propertyId, mediaId, (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    return res.status(201).json({
                        msg: 'Property created successfully',
                        propertyId,
                        mediaId
                    });
                });
            });
        });
    },

    getAllProperty: (req, res) => {
        Property.getAll((err, propertys) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const promises = propertys.map(property => {
                return new Promise((resolve, reject) => {
                    Media.getByPropertyId(property.property_id, (err, media) => {
                        if (err) return reject(err);
                        property.media = media;
                        resolve(property);
                    });
                });
            });

            Promise.all(promises)
            .then(result => res.json(result))
            .catch( err => res.status(500).json({error: err.message}));

        });
    },

    getPropertyById: (req, res) => {
        const property_id = req.params.id;
        Property.getById(property_id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ msg: 'Property not found!' });
            }
            res.json(results[0]);
        });
    }
};

module.exports = propertyController;