import { Song, Setlist, Artist } from '../../models';

export default (app) => {
  app.get('/setlists/:id', viewSetlist);
  app.get('/setlists/:id/songs/create', addSetlistSong);
  app.post('/songs/:id/edit', updateSetlistSong);
  app.post('/setlists/create', createSetlist);
  return app;
}
function createSetlist(req, res) {
  const { artist } = req.body;
  Artist.findOne({ name: artist })
    .then(foundArtist => {
      return foundArtist ? foundArtist : new Artist({ name: artist }).save();
    })
    .then(setListArtist => {
      return setListArtist.then
      ? setListArtist.then(newArtist => {
        new Setlist({ ...req.body, artist: newArtist.id }).save()
          .then(newSetlist => res.send({ id: newSetlist.id }))
      })
      : new Setlist({ ...req.body, artist: setListArtist.id }).save()
          .then(newSetlist => res.send({ id: newSetlist.id }));
    })
    .catch(err => {
      console.log(err);
      res.send("An error occurred.")
    });
}
function viewSetlist(req, res) {
  const { id } = req.params;
  Setlist.findById(id)
    .populate('artist')
    .populate('songs')
    .then(setlist => res.send(setlist))
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
function addSetlistSong(req, res) {
  const { id } = req.params;
  new Song({}).save()
    .then(newSong => {
      Setlist.findByIdAndUpdate(id, { $push: { songs: newSong.id } }, { new: true })
        .then(() => res.send(newSong));
    })
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
function updateSetlistSong(req, res) {
  const { id } = req.params;
  const updateBody = req.body;
  Song.findByIdAndUpdate(id, { $set: updateBody }, { new: true })
    .then(updatedSong => res.send(updatedSong))
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
