FROM openjdk:13-jdk-alpine
VOLUME /tmp
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /poller.jar" ]