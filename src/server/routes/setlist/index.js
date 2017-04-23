import { Song, Setlist, Artist } from '../../models';

export default (app) => {
  app.get('/setlists/:id', viewSetlist);
  app.post('/setlists/:id/addsong', addSetlistSong);
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
        new Setlist({ ...req.body, artist: newArtist.id, performanceDate: req.body.performanceDate._d }).save()
          .then(newSetlist => res.send({ id: newSetlist.id }))
      })
      : new Setlist({ ...req.body, artist: setListArtist.id, performanceDate: req.body.performanceDate._d }).save()
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
    .then(setlist => res.send(setlist))
    .catch(err => {
      console.log(err);
      res.send("An error occurred");
    });
}
function addSetlistSongs(req, res) {
  const { id } = req.params;
  const { song } = req.body;
}
