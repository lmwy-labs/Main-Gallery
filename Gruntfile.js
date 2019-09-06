module.exports = (grunt) => {
  grunt.initConfig({
    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      dist: {
        options: {
          bucket: 'lmwy-labs-ot-images',
        },
        files: [
          {
            expand: true,
            cwd: 'public',
            src: ['main.js'],
            dest: '/Documents',
          },
        ],
      },
    },
    uglify: {
      bundle: {
        src: './public/main.js',
        dest: './public/main.mini.js',
      },
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('default', ['uglify', 'watch']);
  grunt.registerTask('deploy', 'aws_s3:dist');
};
