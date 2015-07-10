var topology = {
    connection: {
        user: 'senz', pass: 'xiaosenz', server: '182.92.72.69', port: 5672, vhost: 'senz'
    },
    exchanges:[
        { name: 'new_log_arrival_demo', type: 'fanout' },
        { name: 'new_crf_status_creation_demo', type: 'fanout' },
        { name: 'new_hmm_status_creation_demo', type: 'fanout' }


    ],
    queues:[],
    bindings:[]
};

exports.topology   = topology;
