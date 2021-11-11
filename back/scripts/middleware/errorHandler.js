function errorHandler(err, req, res, next) {
  switch (err) {
    default:
      res.status(500).json({ error: err.message });
  }
}
