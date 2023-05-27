CXX=g++
CFLAGS=-I../include

# ACMS
ACMSLIB=libaux
ACMSSRCS= capi.cc
ACMSOBJS= $(ACMSSRCS:.cc=.o) 

#  WebSphere MQ for UNIX
MQLIB=libmqm
MQSRCS= cmqc.c
MQOBJS= $(MQSRCS:.c=.o) 

all : acms MQ

acms : $(ACMSOBJS)
	$(CC) -shared -o $(ACMSLIB).so $(CFLAGS) $(ACMSOBJS)
	ar rv $(ACMSLIB).a $(ACMSOBJS)

MQ : $(MQOBJS)
	$(CC) -shared -o $(MQLIB).so $(CFLAGS) $(MQOBJS)
	ar rv $(MQLIB).a $(MQOBJS)

.c.o:
	$(CC) -c $(CFLAGS) $<

.cc.o:
	$(CXX) -c $(CFLAGS) $<

clean:
	rm -f $(ACMSLIB).* $(MQLIB).* *.o
