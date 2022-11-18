/**
 * @description mp4 convert to hls 
 */

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const filePath = path.join(__dirname, 'hevc.mp4');
fs.mkdirSync('m3u8');

ffmpeg(filePath)
  .videoCodec('libx264')
  .format('hls')
  .outputOptions('-hls_list_size 0')
  .outputOption('-hls_time 10')
  .output(path.join(__dirname, 'm3u8/movie.m3u8'))
  .on('start', () => {
    console.log('mp4 切片中~~~, 请稍等');
  })
  .on('end', () => {
    console.info('movie.mp4 切片完成');
  })
  .run();
