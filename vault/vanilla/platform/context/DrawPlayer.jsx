export const drawPlayer = (context, platform) => {
  if (platform?.map?.player) {
    const {
      map: { player, tileSize },
      camera,
    } = platform;

    context.fillStyle = player.color;
    context.beginPath();

    context.arc(
      player.loc.x + tileSize / 2 - camera.x,
      player.loc.y + tileSize / 2 - camera.y,
      tileSize / 2 - 1,
      0,
      Math.PI * 2
    );

    context.fill();
  }
};
