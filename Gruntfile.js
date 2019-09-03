module.exports = (grunt) => {
  grunt.initConfig({
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

  grunt.registerTask('default', ['uglify', 'watch']);
};
