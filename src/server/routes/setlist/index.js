import { Song, Setlist, Artist } from '../../models';

export default (app) => {
  app.get('/setlists', viewSetlists);
  app.get('/setlists/:id', viewSetlist);
  app.get('/setlists/:id/songs/create', addSetlistSong);
  app.get('/setlists/:id/songs/:songId/delete', deleteSetlistSong);
  app.post('/setlists/:id/songs/sort', saveSetlistSongsSort);
  app.post('/setlists/:id/songs/:songId/save', saveSetlistSong);
  app.post('/setlists/create', createSetlist);
  return app;
}
function viewSetlists(req, res) {
  Setlist.find()
    .populate('songs')
    .populate('artist')
    .then(setlists => res.send(setlists))
    .catch(err => {
      console.log(err);
      res.send("An error occurred.")
    });
}
function deleteSetlistSong(req, res) {
  const { id, songId } = req.params;
  Setlist.findByIdAndUpdate(id, { $pull: { songs: songId } }, { new: true })
    .populate('songs')
    .then(setlist => ({ setlist, deleteSong: Song.findByIdAndRemove(songId)}))
    .then(({ setlist, deleteSong }) => {
      deleteSong.then(deletedSong => res.send(setlist.songs));
    })
    .catch(err => {
      console.log(err);
      res.send("An error occurred.")
    });
}
function createSetlist(req, res) {
  const { artist } = req.body;
  Artist.findOne({ name: artist })
    .then(foundArtist => foundArtist ? foundArtist : new Artist({ name: artist }).save())
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
        .populate('songs')
        .then(setlist => res.send(setlist.songs));
    })
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
function saveSetlistSong(req, res) {
  const { id, songId } = req.params;
  const updateBody = req.body;
  Song.findByIdAndUpdate(songId, { $set: updateBody }, { new: true })
    .then(updatedSong => Setlist.findById(id).populate('songs'))
    .then(setlist => res.send(setlist.songs))
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
function saveSetlistSongsSort(req, res) {
  const { id } = req.params;
  const { songs } = req.body;
  Setlist.findByIdAndUpdate(id, { $set: { songs } })
    .then(() => {
      res.status(200).send('Songs sorted');
    })
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
